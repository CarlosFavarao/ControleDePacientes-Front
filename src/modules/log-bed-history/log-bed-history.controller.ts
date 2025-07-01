import { Page, BedHistoryDTO, BedResponseDTO } from '../types';

export class LogBedHistoryController {
    static $inject = ['$http'];

    beds: any[] = [];

    listBeds(){
        this.$http.get('http://localhost:8080/beds')
            .then(response => {this.beds = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Camas', error);})
    }

    constructor(private $http : angular.IHttpService){
        this.listBeds();
    }
}