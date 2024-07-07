import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, collection, query, where, getDocs, onSnapshot, getFirestore, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig';

export class UsersModel {

  constructor(email, password, name, birthdate, typeUser, age) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.birthdate = birthdate;
    this.typeUser = typeUser
    this.age = age;
    this.db = db;
  }

  static async register(dataUser) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, dataUser.email, dataUser.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: dataUser.email,
        name: dataUser.name,
        birthdate: dataUser.birthdate,
        typeUser: dataUser.typeUser,
        age: dataUser.age,
        interests: []
      });
      console.log('Usuario registrado:', dataUser);
      return user;
    } catch (error) {
      // Correo ya existe
      if (error.code === 'auth/email-already-in-use') {
        console.error('El correo electrónico ya está registrado.');
        throw new Error('El correo electrónico ya está registrado.');
      } else {
        // Otros errores
        console.error('Error al registrar el usuario:', error.message);
        throw new Error('El correo electrónico ya está registrado.');
      }
    }
  }

  static async getUserById(userId, callback) {
    try {
      const docRef = doc(db, 'users', userId);

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const user = { id: docSnap.id, ...docSnap.data() };
          callback(user);
        } else {
          console.log('No such document!');
          callback(null); // Llamar al callback con null si no existe el documento
        }
      });

      return unsubscribe; // Devolver la función de cancelación del listener
    } catch (error) {
      console.error('Error getting user:', error);
      throw error; // Mostrar error
    }
  }


  // Función para verificar el tipo de usuario
  static async checkUserType(userId) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', '==', userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data().typeUser; // Devuelve el tipo de usuario
    }
    throw new Error('Usuario no encontrado');
  }

  static async resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  static async saveImg(uri, userId) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      // Obtener la referencia de storage
      const storage = getStorage();
      const storageRef = ref(storage, "imgs/" + userId);
      // Subir el blob a Firebase Storage
      await uploadBytes(storageRef, blob);
      // Obtener la URL de la imagen
      const downloadURL = await getDownloadURL(storageRef);
      // Guardar la URL de la imagen en el documento del usuario
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        imageUrl: downloadURL
      });
      // Devolver la URL de la imagen
      return downloadURL;
    } catch (error) {
      console.log("Error al guardar la imagen:", error);
      throw error;
    }
  }

  //agregar los intereses del usaurio a su documento
  static async updateInterests(userId, interests) {
    try {
      // Obtener referencia al documento del usuario
      const userRef = doc(db, 'users', userId);
      // Actualizar el campo 'interests' en el documento del usuario
      await updateDoc(userRef, {
        interests: interests
      });
      console.log('Intereses actualizados en Firestore:', interests);
    } catch (error) {
      console.error('Error al actualizar intereses en Firestore:', error);
      throw error;
    }
  }

}
