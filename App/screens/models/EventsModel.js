import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc,where, onSnapshot, query, getDoc } from 'firebase/firestore';

export class EventsModel {

    constructor(name, description, date, coordinates, interests, userId) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.coordinates = coordinates;
        this.interests = interests;
        this.userId = userId;
    }

    // Obtiene todos los eventos y se suscribe a cambios en tiempo real
    static listenToEvents(callback) {
        try {
            const unsubscribe = onSnapshot(collection(db, 'events'), (querySnapshot) => {
                const events = [];
                querySnapshot.forEach((doc) => {
                    events.push({ id: doc.id, ...doc.data() });
                });
                callback(events);
            });

            return unsubscribe;
        } catch (error) {
            console.error('Error listening to events:', error);
            return () => { }; // Devolver una función vacía si ocurre un error para evitar errores
        }
    }

    // Obtiene un evento por su ID
    static async getEventById(eventId, callback) {
        try {
          const docRef = doc(db, 'events', eventId);
    
          const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              const event = { id: docSnap.id, ...docSnap.data() };
              callback(event);
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

    // Función para guardar el evento en la base de datos
    static async saveEvent(event) {
        try {
            const refDoc = await addDoc(collection(db, "events"), {
                name: event.name,
                description: event.description,
                date: event.date,
                coordinates: event.coordinates,
                interests: event.interests,
                createBy: event.userId
            });
            return true;
        } catch (error) {
            console.error('Error saving event:', error);
            return false;
        }
    }

    // Elimina un evento por su ID
    static async deleteEvent(eventId) {
        try {
            await deleteDoc(doc(db, 'events', eventId));
            return true;
        } catch (error) {
            console.error('Error deleting event:', error);
            return false;
        }
    }

    // Función para verificar el límite de eventos
    static async checkEventLimit(userId) {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, where('createBy', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size; // Devuelve el número de eventos creados por el usuario
    }

    static listenToFreemiumEvents(callback) {
        const currentDate = new Date();
        currentDate.setUTCHours(22, 0, 0, 0); // Establecer las 10 PM en UTC
    
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, where('date', '>', currentDate));
    
        return onSnapshot(q, (snapshot) => {
          const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          callback(events);
        });
      }

}
