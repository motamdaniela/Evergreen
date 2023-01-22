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

    getLoggedObj(){
      let user = this.users.find((user) => user.email == this.getLogged)
      return JSON.stringify(user);
    },
    
    getUsers(){
      return this.users;
    },

    getUsersUser(){
      let u=[]
      this.users.forEach(user =>{
        if(user.type=="user"){
          u.push(user)
        }
      })
      return u;
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
      if(usersU.length<3){
        for (let i=0; i<usersU.length; i++){
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
      if(this.users.find(user=>user.email==email && user.password==password || user.username==email && user.password==password)){
        let logged = this.users.find(user=>user.email==email || user.username==email)
        this.logged=logged.email
        // changes the login date
        let today = new Date();
        logged.previousLoginDate= +logged.loginDate
        logged.loginDate= +(today.getFullYear()+""+((today.getMonth()+1).toString().length < 2 ? "0" + (today.getMonth() + 1) : (today.getMonth()+1))+""+(today.getDate().toString().length < 2 ? "0" + today.getDate() : today.getDate()))
        let yesterday= new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        let yesterdayDate =yesterday.getFullYear()+""+((yesterday.getMonth()+1).toString().length < 2 ? "0" + (yesterday.getMonth() + 1) : (yesterday.getMonth()+1))+""+(yesterday.getDate().toString().length < 2 ? "0" + yesterday.getDate() : yesterday.getDate())
        // checks when was the last time the user logged in
        if(logged.previousLoginDate==yesterdayDate){
          logged.streak+=1
          // logged.points+=logged.streak
          // if(logged.streak==7){
          //   logged.streak=0
          // }

        }else if(logged.previousLoginDate<logged.loginDate){
          logged.streak=1
          // logged.points+=1
        }
        
      }else{
        alert('Credenciais erradas')
      }
    },

    // adds users
    add(obj){
      obj.rank=this.getUsersUser.length+1
      this.users.push(obj)
    },

    logOut(){
      this.logged=""
    },

    edit(obj){
      obj = JSON.parse(obj)
      if(this.users.find(user=>user.email== obj.email)){
        this.user = obj;
      }
    },

    delete(obj){
      obj = JSON.parse(obj)
      if(this.users.find(user=>user.email== obj.email)){
        this.users.pop(this.user)
      }
    },

    // sign up action
    signUp(name,email,username,school,password,passConf){
      // checks if email has already been used
      if(this.users.find(user=>user.email==email)){
        alert("Email já existe")
      }else{
        let today = new Date();
        // checks if passwords match
        if(password==passConf){
          let obj={
            type: 'user',
            email: email,
            username: username,
            name: name,
            password: password,
            school: school,
            previousLoginDate:0,
            streak: 0,
            loginDate: +today.getFullYear()+""+((today.getMonth()+1).toString().length != 2 ? "0" + (today.getMonth() + 1) : (today.getMonth()+1))+""+(today.getDate().toString().length != 2 ?"0" + today.getDate() : today.getDate()),
            photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            points: 0,
            rewards: [],
            state: 'active',
            rank: 0,
            council: false
          }
          obj.rank=this.getUsersUser.length+1
          this.users.push(obj)
          this.logged=obj.email
          alert('henlo')
        }else{
          alert('Password errada')
        }
      }
    },

    newAdmin(name,email,username,password,passConf){
      // checks if email has already been used
      if(this.users.find(user=>user.email==email)){
        alert("Email já existe")
      }else{
        // checks if passwords match
        if(password==passConf){
          let obj={
            type: 'admin',
            email: email,
            username: username,
            name: name,
            password: password,
            data: 'data',
            photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          }
          this.users.push(obj)
          alert('henlo')
        }else{
          alert('Password errada')
        }
      }
    }

  },
});


