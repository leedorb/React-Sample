//const apiUrl = 'http://localhost/app/api/person';
const apiUrl = 'http://api-test-controller-leedor-test.apps.redhat-raanana.com/api/person';

export default class PersonService{    
    static getPersonListData = () => {
         return fetch(apiUrl)
        .then(response => response.json())
    } 

    static getPersonById = (id) => {
         return fetch(apiUrl + "/" + id)
        .then(response =>  {
            if (response.ok) {
                return response.json();
            }
            else {
                return response.text()
            }
        })
        
    }

    static delPersonById = (id) => {
         return fetch(apiUrl + "/" + id, {
            method: 'DELETE',
         })
    }

    static addNewPerson = (obj) => {
        return fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                "Content-Type":"application/json"
            }
        })
    }

    static editPerson = (id , obj) => {
        return fetch(apiUrl + "/" + id, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                "Content-Type":"application/json"
            }
        })
    }
}

