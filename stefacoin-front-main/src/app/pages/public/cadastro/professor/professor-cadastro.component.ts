import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/models/professor';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-professor-cadastro',
  templateUrl: './professor-cadastro.component.html',
  styleUrls: ['./professor-cadastro.component.css']
})
export class ProfessorCadastroComponent implements OnInit {
  
  id: any
  textoBotao: string = 'Cadastrar' 
  professor: Professor
  profileForm: FormGroup;
  public arrayOpcoes: Array<string> = ['Fundamental Incompleto', 'Fundamental','Médio Incompleto','Médio','Superior Incompleto','Superio Completo','Pós-Graduação Incompleto', 'Pós-Graduação completo']  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private professorService: ProfessorService
    
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros =>{
      if(parametros['id']){
        this.textoBotao = 'Modificar'
        this.id = parametros['id']
      }
    })
    this.profileForm = new FormGroup({
      nome: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      pwd1: new FormControl('',[Validators.required]),
      pwd2: new FormControl('',[Validators.required]),
    });
  }
    
    
    incluir = ()=>{
      console.log(this.profileForm)
      let professor = {
        nome: this.profileForm.get("nome").value,
        email: this.profileForm.get("email").value,
        senha: this.profileForm.get("pwd1").value,
        tipo: 1
      }
  
      this.professorService.incluir(professor).pipe(take(1)).subscribe(response =>{
        console.log(response)
      })
    
    }

    navegar =(rota: any)=>{
      this.router.navigate([rota])
    }   
  }
  