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

    add(obj){
      this.users.push(obj)
    },

    logOf(){
      this.logged=""
    },

    // sign up action
    signUp(email,name,password,school,course,passConf){
      // checks if email has already been used
      if(this.users.find(user=>user.email==email)){
        alert("Email já existe")
      }else{
        // checks if passwords match
        if(password==passConf){
          let obj={
            type: 'user',
            email: email,
            name: name,
            password: password,
            school: school,
            course: course,
            data: 'data',
            photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            points: 0,
            badges: [],
          }
          this.users.push(obj)
          this.logged=obj.email
        }else{
          alert('Password errada')
        }
      }
    }
  },
});


