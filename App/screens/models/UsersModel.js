import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, doc, collection, query, where, getDocs, onSnapshot,} from 'firebase/firestore';
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
        age: dataUser.age
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

}
