import { Page, BedHistoryDTO, BedResponseDTO } from '../types';

export class LogBedHistoryController {
    static $inject = ['$http'];

    beds: any[] = [];
    bedHistoryLogs: any[] = [];

    listBeds(){
        this.$http.get('http://localhost:8080/beds')
            .then(response => {this.beds = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Camas', error);})
    }

    constructor(private $http : angular.IHttpService){
        this.listBeds();
    }

    showBedHistory(bedId: number){
        this.$http.get<Page<BedHistoryDTO>>(`http://localhost:8080/adm/history/bed/${bedId}?page=0&size=20`)
            .then(response => {
                this.bedHistoryLogs = response.data.content;
            })
            .catch (error => {console.error('Erro ao Buscar Camas', error);})
    }

}