export default class PersonService{    
    static getPersonListData = () => {
         return fetch(process.env.REACT_APP_API_URL)
        .then(response => response.json())
    } 

    static getPersonById = (id) => {
         return fetch(process.env.REACT_APP_API_URL + "/" + id)
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
         return fetch(process.env.REACT_APP_API_URL + "/" + id, {
            method: 'DELETE',
         })
    }

    static addNewPerson = (obj) => {
        return fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                "Content-Type":"application/json"
            }
        })
    }

    static editPerson = (id , obj) => {
        return fetch(process.env.REACT_APP_API_URL + "/" + id, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                "Content-Type":"application/json"
            }
        })
    }
}

