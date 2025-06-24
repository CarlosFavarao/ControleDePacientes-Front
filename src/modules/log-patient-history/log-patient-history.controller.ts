export class LogPatientHistoryController {
    static $inject = ['$http'];

    patients: any[] = [];

    listPatients(){
        this.$http.get('http://localhost:8080/patients')
            .then(response => {this.patients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    constructor(private $http : angular.IHttpService){
        this.listPatients();
    }
}