/* eslint-disable no-undef */
/* eslint-disable react/no-direct-mutation-state */
import React,{ useState }from "react";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { Toast } from "primereact/toast";

import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import MenuLeft from "../../components/Menu/MenuLeft";
import DeviceService from "../../services/DeviceService";

// eslint-disable-next-line react-hooks/rules-of-hooks

export default class CreateDevice extends React.Component {
  state = {
    items: [{ label: "Dispositivos", url: "/devices" }, { label: "Cadastrar" }],

    home: { icon: "pi pi-home ", url: "/" },
    
    deviceid:"",
    filamentosArray:[],
    devices: [
      {
        
        codigo: "",
        img:"",
        ultimaManutencao: "",
        modelo: "",
        temperaturaMaxima: "",
        eixoX: "",
        eixoY: "",
        eixoZ: "",
        filamentos:[],
      },
    ],

    tipos: [
      { label: "SLA", value: "SLA" },
      { label: "SCANNER", value: "SCANNER" },
      { label: "FDM", value: "FDM" },
      { label: "DLP", value: "DLP" },
      { label: "CANETA 3D", value: "CANETA 3D" },
    ],
    tipo: "",
    
    toast: "",

    msgDeErro: "",
    errorCod: "",
    errorMod: "",
    errorTemp: "",
    errorEX: "",
    errorEY: "",
    errorEZ: "",
    errorTipo: "",
  };

  constructor() {
    super();
    this.service = new DeviceService();
  }
  onFilamentosChange = (e) => {
    let _filamentos = [this.filamentos];
  
    if (e.checked)
        _filamentos.push(e.value);
    else
        _filamentos.splice(_filamentos.indexOf(e.value), 1);
  
    this.filamentos = _filamentos;
  }

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  salvar = () => {
    this.service
      .create({
        img: this.state.img,
        ultimaMnautencao: this.state.ultimaMnautencao,
        codigo: this.state.codigo,
        modelo: this.state.modelo,
        temperaturaMaxima: this.state.temperaturaMaxima,
        eixoX: this.state.eixoX,
        eixoY: this.state.eixoY,
        eixoZ: this.state.eixoZ,
        filamentosSelecionados: this.state.filamentosSelecionado,
        tipo: this.state.tipo,
      })
      .then(async (response) => {
        this.state.toast.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Salvo Com Sucesso",
        });
        await this.delay(2000);
        window.location.href = `/devices`;
      })
      .catch((error) => {
        this.state.toast.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao Salvar",
        });
        console.log(error);
      });
  };

  confirm = async () => {
    confirmDialog({
      message: "Você Realmente quer Cadastrar?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

      accept: this.accept,
      reject: this.reject,
    });
    await this.delay(10);
  };
  //Po up de confirmação de cadastro
  accept = () => {
    this.state.toast.show({
      severity: "info",
      summary: "Confirmado",
      detail: "Cadastro Confirmado",
      life: 3000,
    });
    this.salvar();
  };
  reject = () => {
    this.state.toast.show({
      severity: "warn",
      summary: "Regeitado",
      detail: "Cadastro não Aceito",
      life: 3000,
    });
  };
 // Validar se os campos estão preenchidos corretamente
 validar = () => {
  let msgError = {
    severity: "error",
    summary: "Corrija os Erros a Baixo",
    detail: "Campos não podem ser nulos",
  };
  let frasePadrao = "Esse Campo é Obrigatorio";
  let disparo = 0;

  this.setState({ errorMod: "" });
  this.setState({ errorCod: "" });
  this.setState({ errorTemp: "" });
  this.setState({ errorEX: "" });
  this.setState({ errorEY: "" });
  this.setState({ errorEZ: "" });
  this.setState({ errorTipo: "" });


  //Pre Validação do codigo
  if (this.state.codigo === "") {
    disparo++;
    let a = document.getElementById("cod");
    a.classList.add("p-invalid");
    this.setState({ errorCod: frasePadrao });
  }

  if (this.state.modelo === "") {
    disparo++;
    let a = document.getElementById("modelo");
    a.classList.add("p-invalid");
    this.setState({ errorMod: frasePadrao });
  }

  if (this.state.tempMax === "") {
    disparo++;
    let a = document.getElementById("temp");
    a.classList.add("p-invalid");
    this.setState({ errorTemp: frasePadrao });
  }

  //Pre Validação do eixo X
  if (this.state.eixoX === "") {
    disparo++;
    let a = document.getElementById("eX");
    a.classList.add("p-invalid");
    this.setState({ errorEX: frasePadrao });
  }

  //Pre Validação do eixo Y
  if (this.state.eixoY === "") {
    disparo++;
    let a = document.getElementById("eY");
    a.classList.add("p-invalid");
    this.setState({ errorEY: frasePadrao });
  }

  //Pre Validação de eixo Z
  if (this.state.eixoZ === "") {
    disparo++;
    let a = document.getElementById("eZ");
    a.classList.add("p-invalid");
    this.setState({ errorEZ: frasePadrao });
  }
  //Pre Validação de Data de Manutenção
  if (this.state.dataDeManu === "") {
    disparo++;
    let a = document.getElementById("dataM");
    a.classList.add("p-invalid");
    this.setState({ errorData: frasePadrao });
  }
  if (disparo !== 0) {
    this.state.toast.show(msgError);
  } else {
    this.confirm();
  }
};
// Po up para velidar se realmente deseja
  
  render() {
    return (
      <>
        <MenuLeft />
        <div className="container">
          <div className="header">
            <Toast ref={(el) => (this.state.toast = el)} />

            {/* BreadCrumb: Usado para o menu de navegaçao que fica ao lado do bt de salvar */}
            <div className="header">
              <BreadCrumb
                model={this.state.items}
                home={this.state.home}
              ></BreadCrumb>
            </div>
          </div>
          <div className="bt-salvar">
            {/* Campo de dialogo que aparece para confirmar se deseja salvar  */}
            {/* Ele chama a função de validar, caso a validação der ok,apresenta o campo para confirmação e caso confirmado, chama a função de salva */}
            <ConfirmDialog
              acceptClassName="p-button-success"
              rejectClassName="p-button-danger"
              acceptLabel="Sim"
              rejectLabel="Não"
            />
          </div>
          {/* Começas os Campos  */}
         
          <div className="input-um">
            <br /><br />
            <label htmlFor="dataUltManu">DATA DA ULTIMA MANUTENÇÃO</label>
            <br /><br />
            <InputText
              id="dataUltManu"
              className="borderColorEdit input-cidade"
              type="date"
              value={this.state.ultimaManutencao}
              onChange={(e) => {
                this.setState({ ultimaManutencao: e.target.value });
              }}
            />
          </div>
          <div className="input-texts">
            <div className="input-um">
              <InputText
                id="modelo"
                className="borderColorEdit"
                type="text"
                value={this.state.modelo}
                onChange={(e) => {
                  this.setState({ modelo: e.target.value });
                }}placeholder="MODELO"
              />

              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorMod && (
                <span style={{ color: "red" }}>{this.state.errorMod}</span>
              )}
            </div>
          </div>

          <div className="input-texts">
            <div className="input-um">
              <InputText
                id="temp"
                className="borderColorEdit"
                type="text"
                value={this.state.temperaturaMaxima}
                onChange={(e) => {
                  this.setState({ temperaturaMaxima: e.target.value });
                }}placeholder="TEMPERATURA MÀXIMA"
              
              />

              {/* usado para mostrar a msg de erro, caso tenha */}
              {this.state.errorTemp && (
                <span style={{ color: "red" }}>{this.state.errorTemp}</span>
              )}
            </div>
          </div>

          <div className="input-texts">
                  <InputText
                        id="eX"
                        type="text"
                        value={this.state.eixoX}
                        onChange={(e) => {
                          this.setState({ eixoX: e.target.value });
                        }}
                        placeholder="EIXO X"
                      />
        
                      {/* usado para mostrar a msg de erro, caso tenha */}
                      {this.state.errorEX && (
                        <span style={{ color: "red" }}>{this.state.errorEX}</span>
                      )}
                </div>      
        
            <div className="input-texts">
                        <InputText
                      id="eY"
                      className="borderColorEdit"
                      type="text"
                      value={this.state.eixoY}
                      onChange={(e) => {
                        this.setState({ eixoY: e.target.value });
                      }}
                      placeholder="EIXO Y"
                    />

                    {/* usado para mostrar a msg de erro, caso tenha */}
                    {this.state.errorEY && (
                      <span style={{ color: "red" }}>{this.state.errorEY}</span>
                    )}

              </div>

              <div className="input-texts">
                      <InputText
                        id="eZ"
                        className="borderColorEdit"
                        type="text"
                        value={this.state.eixoZ}
                        onChange={(e) => {
                          this.setState({ eixoZ: e.target.value });
                        }}
                        placeholder="EIXO Z"
                      />
                      {/* usado para mostrar a msg de erro, caso tenha */}
                      {this.state.errorEZ && (
                        <span style={{ color: "red" }}>{this.state.errorEZ}</span>
                      )}
              </div>
          
          <br />  
          <div>
          </div>
          <div className="conteinner">
            <div className="input-um">
                <label>Filamentos Suportados</label> 
            </div>
            <br/>
            <div className="input-texts">
                <div className="input-um">
                    <Checkbox inputId="filamento1" name="suporte" value="PLA" onChange={this.onFilamentosChange('PLA')} />
                    <label htmlFor="filamento1" className="ml-2">PLA</label>
                </div>
                <div className="input-um">
                    <Checkbox inputId="filamento2" name="suporte" value="ABS" onChange={this.onFilamentosChange('ABS')} />
                    <label htmlFor="filamento2" className="ml-2">ABS</label>
                </div>
                <div className="input-um">
                    <Checkbox inputId="filamento3" name="suporte" value="PET" onChange={this.onFilamentosChange('PET')} />
                    <label htmlFor="filamento3" className="ml-2">PET</label>
                </div>
               
            </div>
           
            <div className="input-texts"> 
                <div className="input-um">
                    <Checkbox inputId="filamento5" name="suporte" value="TPU" onChange={this.onFilamentosChange('TPU')} />
                    <label htmlFor="filamento5" className="ml-2">TPU</label>
                </div>
                <div className="input-um">
                    <Checkbox inputId="filamento4" name="suporte" value="HIP" onChange={this.onFilamentosChange('HIP')} />
                    <label htmlFor="filamento4" className="ml-2">HIP</label>
                </div>
                <div className="input-um">
                    <Checkbox inputId="filamento6" name="suporte" value="ASA" onChange={this.onFilamentosChange('ASA')} />
                    <label htmlFor="filamento6" className="ml-2">ASA</label>
                </div>

            </div>
        </div>
          <div className="input-texts">
            <Dropdown
              id="seletor-tipo"
              value={this.state.tipo}
              options={this.state.tipos}
              onChange={(e) => this.setState({ tipo: e.value })}
              placeholder="TIPO"
            />
            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorTipo && (
              <span style={{ color: "red" }}>{this.state.errorTipo}</span>
            )}
          </div>
        </div>
        <br />

        <div className="bts">
          <div className="bt">
            <Button
              label="SALVAR"
              severity="warning"
              raised
              onClick={this.validar}
            />
          </div>
          <div className="bt">
            <a href="/devices">
              <Button label="CANCELAR"></Button>
            </a>
          </div>
        </div>
      </>
    );
  };
}