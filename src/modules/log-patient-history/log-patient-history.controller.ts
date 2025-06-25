import { Page, LogDTO } from '../types';

export class LogPatientHistoryController {
    static $inject = ['$http'];

    patients: any[] = [];
    patientHistoryLogs: any[] = [];

    patientId: number | null = null;

    historyPageNumber: number = 0;
    historyPageSize: number = 5;
    historyTotalPages: number = 0;

    listPatients(){
        this.$http.get('http://localhost:8080/patients')
            .then(response => {this.patients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    constructor(private $http : angular.IHttpService){
        this.listPatients();
    }

    searchName: string = '';

    findPatientsByName(){
        if(!this.searchName || this.searchName.trim() === '') {
            this.listPatients();
            return
        }

        this.$http.get(`http://localhost:8080/patients/search/${this.searchName}`)
            .then(response => {this.patients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    showPatientHistory(patientId: number){

        this.patientId = patientId;
        this.$http.get<Page<LogDTO>>(`http://localhost:8080/adm/history/patient/${patientId}?page=${this.historyPageNumber}&size=${this.historyPageSize}`)
            .then(response => {
                this.patientHistoryLogs = response.data.content;
                this.historyTotalPages = response.data.totalPages;
            })
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    nextPage() {
        if (this.historyPageNumber < this.historyTotalPages - 1) {
            this.historyPageNumber++;
            this.showPatientHistory(this.patientId!);
        }
    }

    previousPage() {
        if (this.historyPageNumber > 0) {
            this.historyPageNumber--;
            this.showPatientHistory(this.patientId!);
        }
    }
}