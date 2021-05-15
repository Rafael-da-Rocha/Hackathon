import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlunoService } from 'src/app/services/aluno.service';
import { Aluno } from 'src/app/models/aluno'
import { Observable } from 'rxjs';
import { Mensagem } from 'src/app/models/mensagem';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {

  id: any
  textoBotao: string = 'Cadastrar' 
  aluno:Aluno
  profileForm: FormGroup;
  textoFormacao: string = "Formação...";

  public arrayOpcoes: Array<string> = ['Fundamental Incompleto', 'Fundamental','Médio Incompleto','Médio','Superior Incompleto','Superio Completo','Pós-Graduação Incompleto', 'Pós-Graduação completo']  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private http: HttpClient
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
      formacao: new FormControl('',[Validators.required]),
      idade: new FormControl('',[Validators.required]),
    });
  }

  incluir = ()=>{
    console.log(this.profileForm)
    let aluno = {
      idade: this.profileForm.get("idade").value,
      nome: this.profileForm.get("nome").value,
      email: this.profileForm.get("email").value,
      senha: this.profileForm.get("pwd1").value,
      formacao: this.profileForm.get("formacao").value,
      tipo: 2
    }
    this.alunoService.incluir(aluno).pipe(take(1)).subscribe(response =>{
      console.log(response)
    })
  
  }

  navegar =(rota: any)=>{
    this.router.navigate([rota])
  }
}
