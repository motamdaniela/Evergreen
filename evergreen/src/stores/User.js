import {defineStore} from 'pinia'
import {useLocalStorage, useStorage } from '@vueuse/core'
// import { ref, computed } from "vue";

export const useUsersStore = defineStore('user',{
  state: () => ({
    users:useStorage('users',[]),
    logged:"",
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

    logOf(){
      this.logged=""
    },

    // sign up action
    signUp(email,name,password,school,course,passConf){
      // checks if email has already been used
      if(this.users.find(user=>user.email==email)){
        alert("Email já existe")
      }else{
        // checks if password matches
        if(password==passConf){
          let obj={
            type: 'user',
            email: email,
            name: name,
            password: password,
            school: school,
            course: course,
            data: 'data',
            photo: '',
            points: 0,
            badges: [],
          }
          this.users.push(obj)
        }else{
          alert('Password errada')
        }
      }
    }
  },

  
});
