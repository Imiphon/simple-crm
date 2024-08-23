import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { Observable, from } from "rxjs";
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  async addUser(user: User) {
    const userRef = collection(this.firestore, 'Users');

    return addDoc(userRef, { ...user }).then(docRef => {
      const userId = docRef.id; // Die generierte ID des Dokuments

      // Die generierte ID dem User-Objekt zuweisen
      user.customIdName = userId;

      // Optional: Die generierte ID auch im Dokument in Firestore speichern
      return updateDoc(docRef, { customIdName: userId });
    });
  }
  

  getUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, 'Users');
    return collectionData(userRef, {idField: 'customIdName'}) as Observable<User[]>;
  }

  getUser(customIdName: string): Observable<User> {
    const userDocRef = doc(this.firestore, `Users/${customIdName}`);
    return from(getDoc(userDocRef).then(docSnap => docSnap.data() as User));
  }
}