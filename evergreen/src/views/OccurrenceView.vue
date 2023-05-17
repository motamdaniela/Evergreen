<template>
  <div class="form">
    <form ref="form" @submit.prevent="onSubmit">
      <v-window show-arrows>
        <template v-slot:prev="{ props }">
          <btn class="btn-page btnG" id="prevBtn" @click="props.onClick">
            Anterior
          </btn>
        </template>
        <template v-slot:next="{ props }">
          <btn class="btn-page btnP" id="nextBtn" @click="props.onClick">
            Próximo
          </btn>
        </template>

        <v-window-item :key="`card-${1}`">
          <!-- local -->
          <div class="tabs">
            <div>
              <img src="../assets/images/icone_local.svg" class="img" alt="" /><br />
              <label class="tabO" id="lblY">Local</label>
            </div>
            <div>
              <img src="../assets/images/tipo_bw.svg" class="img" alt=""/><br />
              <label class="tabO">Tipo</label>
            </div>
            <div>
              <img src="../assets/images/descricao_bw.svg" class="img" alt=""/><br />
              <label class="tabO">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/foto_bw.svg" class="img" alt=""/><br />
              <label class="tabO">Foto</label>
            </div>
          </div>

          <div class="formContent">
            <div>
              <label class="semiTitle">Campus:</label><br />
              <select
                v-model="form.campus"
                class="input"
                @change="changeCamp"
                name=""
                required
              >
                <option v-for="camp in campus">
                  {{ camp.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Escola:</label><br />
              <select
                v-model="form.school"
                class="input"
                @change="changeSchool"
                name=""
                required
              >
                <option v-for="school in schools">{{ school.name }}</option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Bloco:</label><br />
              <select
                v-model="form.building"
                class="input"
                @change="changeBuilding"
                name=""
                required
              >
                <option v-for="building in buildings">
                  {{ building.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Piso:</label><br />
              <select
                v-model="form.floor"
                class="input"
                @change="changeFloor"
                name=""
                required
              >
                <option v-for="floor in floors">
                  {{ floor.id }}
                </option>
              </select>
            </div>

            <div>
              <label class="semiTitle">Sala:</label><br />
              <select v-model="form.classroom" class="input" name="" required>
                <option v-for="classroom in classrooms">
                  {{ classroom.id }}
                </option>
              </select>
            </div>
          </div>
        </v-window-item>
        <v-window-item :key="`card-${2}`">
          <!-- tipo -->
          <div class="tabs">
            <div>
              <img src="../assets/images/local_bw.svg" class="img" /><br />
              <label class="tabO">Local</label>
            </div>
            <div>
              <img src="../assets/images/icone_tipo.svg" class="img" /><br />
              <label class="tabO" id="lblR">Tipo</label>
            </div>
            <div>
              <img src="../assets/images/descricao_bw.svg" class="img" /><br />
              <label class="tabO">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/foto_bw.svg" class="img" /><br />
              <label class="tabO">Foto</label>
            </div>
          </div>

          <div id="allRb">
            <div class="typeRow" v-for="tp in types">
              <input
                type="radio"
                v-model="form.idType"
                class="rb"
                name="type"
                :value="tp.id"
                @:change="
                  {
                    {
                      id(tp.id);
                    }
                  }
                "
                required
              />
              <label class="typeLbl">{{ tp.name }}</label>
            </div>
            <input
              class="input"
              id="outro"
              placeholder="Outro"
              type="text"
              name=""
              v-model="form.other"
              required
              disabled
            />
          </div>
        </v-window-item>
        <v-window-item :key="`card-${3}`">
          <!-- descricao -->
          <div class="tabs">
            <div>
              <img src="../assets/images/local_bw.svg" class="img" /><br />
              <label class="tabO">Local</label>
            </div>
            <div>
              <img src="../assets/images/tipo_bw.svg" class="img" /><br />
              <label class="tabO">Tipo</label>
            </div>
            <div>
              <img
                src="../assets/images/icone_descricao.svg"
                class="img"
              /><br />
              <label class="tabO" id="lblG">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/foto_bw.svg" class="img" /><br />
              <label class="tabO">Foto</label>
            </div>
          </div>

          <label class="semiTitle">Adiciona uma descrição:</label><br /><br />
          <textarea
            id="descriptionBox"
            rows="10"
            placeholder="O problema encontra-se... "
            type="text"
            v-model="form.description"
            required
          ></textarea>
        </v-window-item>
        <v-window-item :key="`card-${4}`">
          <!-- foto -->
          <div class="tabs">
            <div>
              <img src="../assets/images/local_bw.svg" class="img" /><br />
              <label class="tabO">Local</label>
            </div>
            <div>
              <img src="../assets/images/tipo_bw.svg" class="img" /><br />
              <label class="tabO">Tipo</label>
            </div>
            <div>
              <img src="../assets/images/descricao_bw.svg" class="img" /><br />
              <label class="tabO">Descrição</label>
            </div>
            <div>
              <img src="../assets/images/icone_foto.svg" class="img" /><br />
              <label class="tabO" id="lblP">Foto</label>
            </div>
          </div>

          <label for="avatar" class="semiTitle">Adiciona uma foto:</label>
          <br /><br />
          <input
            @change="previewFiles"
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg"
            ref="myFiles"
            required
          />

          <br /><br />
          <button type="submit" class="btn-page btnY">Submeter</button
          ><br /><br />
        </v-window-item>
      </v-window>
    </form>
  </div>
</template>

<script>
import{useOccurrenceStore}from"@/stores/Occurrence";import{useUsersStore}from"@/stores/User";import{useSchoolStore}from"@/stores/School";import{useMissionStore}from"@/stores/Mission";export default{setup:()=>({occurrenceStore:useOccurrenceStore(),userStore:useUsersStore(),schoolStore:useSchoolStore(),missionStore:useMissionStore()}),data(){return{form:{id:0,date:"",hour:"",campus:"",school:"",building:"",floor:"",classroom:"",idType:0,description:"",photo:"",user:"",state:"",photo:"",other:""},tab:null,first:null,second:null,campus:this.schoolStore.getCampus,schools:[],buildings:[],floors:[],classrooms:[],types:this.occurrenceStore.getTypes}},updated(){console.log(1)},methods:{onSubmit(){this.form.id=this.occurrenceStore.getOccurrences.length,this.form.idType=document.querySelector('input[name="type"]:checked').value;let o=new Date;this.form.date=o.getFullYear()+"-"+(o.getMonth()+1)+"-"+o.getDate(),this.form.hour=o.getHours()+":"+o.getMinutes()+":"+o.getSeconds(),this.form.user=this.userStore.getLogged,this.form.state="pending",this.occurrenceStore.addOccurrence(this.form),this.missionStore.completeMission(this.form.user,2),location.reload()},id(o){let e=document.querySelector('input[name="type"]:checked');e.id=o;const s=document.querySelector("#outro");6==e.id?s.removeAttribute("disabled",""):s.setAttribute("disabled","")},previewFiles(o){const e=o.target.files;if(!e.length)return;const s=new FileReader;s.readAsDataURL(e[0]),s.onload=()=>this.form.photo=s.result},changeCamp(){let o=this.campus.find((o=>o.name==this.form.campus));this.form.building="",this.form.floor="",this.form.classroom="",console.log(o);let e=[];this.schoolStore.getSchools.forEach((s=>{s.idCampus==o.id&&(console.log(0),e.push(s))})),this.schools=e},changeSchool(){let o=this.schoolStore.getSchools.find((o=>o.name==this.form.school));this.form.floor="",this.form.classroom="";let e=[];this.schoolStore.getBuildings.forEach((s=>{s.idSchools.forEach((t=>{t==o.id&&e.push(s)})),this.buildings=e}))},changeBuilding(){let o=this.schoolStore.getBuildings.find((o=>o.name==this.form.building)),e=this.schoolStore.getSchools.find((o=>o.name==this.form.school));this.form.classroom="";let s=[];this.schoolStore.getFloors.forEach((t=>{t.idBuildings.forEach((r=>{t.idSchools.forEach((i=>{r==o.id&&i==e.id&&s.push(t)}))})),this.floors=s}))},changeFloor(){let o=+this.form.floor,e=this.schoolStore.getBuildings.find((o=>o.name==this.form.building)),s=this.schoolStore.getSchools.find((o=>o.name==this.form.school)),t=[];this.schoolStore.getClassrooms.forEach((r=>{r.idBuildings.forEach((i=>{r.idSchools.forEach((c=>{r.idFloor==o&&i==e.id&&c==s.id&&t.push(r)}))}))})),this.classrooms=t}}};
</script>

<style>
@import "../assets/styles/occurrence.css";
</style>
