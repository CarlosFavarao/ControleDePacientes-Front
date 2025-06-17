export class RegisterHospitalController {
    static $inject = ['$http'];

    mensagem: string;
    hospitais: any[] = [];
    

    constructor(private $http : angular.IHttpService){
        this.mensagem = 'Testando!!!';
        this.buscarHospitais();
    }

    buscarHospitais(){
        this.$http.get('http://localhost:8080/hospitals')
        .then(response => {this.hospitais = response.data as any;})
        .catch (error => {console.error('Erro ao Buscar Hospitais', error);})
    }

}