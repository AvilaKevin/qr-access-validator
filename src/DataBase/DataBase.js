import { useEffect } from "react";
import db from '../Firebase/firebaseConfig'
import { addDoc, collection } from "firebase/firestore";

export default function useAddData() {
    useEffect(() => {

        // const pruebita = async () => {
        //   const datos = await getDocs(collection(db, 'usuarios'));
        //   console.log(datos)
        // }

        // pruebita();
        const AddData = async () => {
            try {
                const docRef = await addDoc(collection(db, "offices"),
                    {
                        "office1": {
                            "description": "Bogota",
                            "users": {
                                "employees": {
                                    "ID": 1,
                                    "user": "user1",
                                    "password": "office1"
                                },
                                "admin": {
                                    "user": "admin",
                                    "password": "admin"
                                }
                            }
                        },
                        "office2": {
                            "description": "Cali",
                            "users": {
                                "employees": {
                                    "ID": 2,
                                    "user": "user2",
                                    "password": "office2"
                                },
                                "admin": {
                                    "user": "admin",
                                    "password": "admin"
                                }
                            }
                        },
                        "office3": {
                            "description": "Medellin",
                            "users": {
                                "employees": {
                                    "ID": 3,
                                    "user": "user3",
                                    "password": "office3"
                                },
                                "admin": {
                                    "user": "admin",
                                    "password": "admin"
                                }
                            }
                        },
                        "office4": {
                            "description": "Santa Marta",
                            "users": {
                                "employees": {
                                    "ID": 4,
                                    "user": "user4",
                                    "password": "office4"
                                },
                                "admin": {
                                    "user": "admin",
                                    "password": "admin"
                                }
                            }
                        }
                    });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

        AddData();

    }, []);

}
