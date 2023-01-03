import {defineStore} from 'pinia'
import {useLocalStorage, useSessionStorage ,useStorage } from '@vueuse/core'

export const useUsersStore = defineStore('user',{
  state: () => ({
    users:useStorage('users',[]),
    logged:useSessionStorage('logged',""),
  }),

  getters: {
    getLogged(){
      return this.logged;
    },
    
    getUsers(){
      return this.users;
    },

    getTop3(){
      let usersU=[]
      this.users.forEach(user => {
        if(user.type == 'user'){
          usersU.push(user)
        }
      });
      usersU.sort((a, b) => {
        return b.points - a.points;
      });
      let top=[]
      if(usersU.length==1){
        top.push(usersU)
      }else if(usersU.length==2){
        for (let i=0; i<2; i++){
          top.push(usersU[i])
        }
      }else if(usersU.length>=3){
        for (let i=0; i<3; i++){
            top.push(usersU[i])
        }
      }
      return top;
    }
  },

  actions: {
    // login action
    login(email,password){
      // checks if email and password exist in the users list
      if(this.users.find(user=>user.email==email && user.password==password)){
        let logged = this.users.find(user=>user.email==email)
        this.logged=logged.email
      }else{
        alert('Credenciais erradas')
      }
    },

    // adds users
    add(obj){
      this.users.push(obj)
    },

    logOut(){
      this.logged=""
    },

    // sign up action
    signUp(name,email,username,school,password,passConf){
      console.log(name,email,username,school,password,passConf)
      // checks if email has already been used
      if(this.users.find(user=>user.email==email)){
        alert("Email já existe")
      }else{
        // checks if passwords match
        if(password==passConf){
          let obj={
            type: 'user',
            email: email,
            username: username,
            name: name,
            password: password,
            school: school,
            data: 'data',
            photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            points: 0,
            badges: [],
          }
          this.users.push(obj)
          this.logged=obj.email
          alert('henlo')
        }else{
          alert('Password errada')
        }
      }
    }
  },
});


