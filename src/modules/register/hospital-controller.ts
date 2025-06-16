// Interfaces para dar tipo aos nossos dados
interface IHospital {
    id: number;
    name: string;
}

// O $scope é como a "cola" entre o controller e a view (HTML)
interface IHospitalScope extends ng.IScope {
    hospitals: IHospital[];
    isModalVisible: boolean;
    activeHospital: Partial<IHospital>;
    modalTitle: string;

    fetchAndDisplayHospitals: () => void;
    openAddModal: () => void;
    saveHospital: () => void;
    closeModal: () => void;
}

class HospitalController {
    private apiUrl = 'http://localhost:8080/hospitals';

    // Injetamos os serviços do AngularJS ($scope e $http)
    constructor(private $scope: IHospitalScope, private $http: ng.IHttpService) {
        // Mapeamos as funções da nossa classe para o $scope, para que o HTML possa chamá-las
        this.$scope.fetchAndDisplayHospitals = this.fetchAndDisplayHospitals.bind(this);
        this.$scope.openAddModal = this.openAddModal.bind(this);
        this.$scope.saveHospital = this.saveHospital.bind(this);
        this.$scope.closeModal = this.closeModal.bind(this);
        
        // Inicializa as variáveis no scope
        this.$scope.hospitals = [];
        this.closeModal();

        // Busca os hospitais ao iniciar
        this.fetchAndDisplayHospitals();
    }

    fetchAndDisplayHospitals(): void {
        this.$http.get<IHospital[]>(this.apiUrl).then(
            (response) => {
                this.$scope.hospitals = response.data;
            },
            (error) => {
                console.error('Erro ao buscar hospitais:', error);
                alert('Falha ao carregar a lista de hospitais.');
            }
        );
    }

    openAddModal(): void {
        this.$scope.activeHospital = {}; // Limpa o objeto para um novo hospital
        this.$scope.modalTitle = 'Adicionar Novo Hospital';
        this.$scope.isModalVisible = true;
    }

    closeModal(): void {
        this.$scope.isModalVisible = false;
        this.$scope.activeHospital = {};
    }

    saveHospital(): void {
        const hospitalData = {
            name: this.$scope.activeHospital.name
        };

        // Requisição POST para criar um novo hospital
        this.$http.post(this.apiUrl, hospitalData).then(
            (response) => {
                this.closeModal();
                this.fetchAndDisplayHospitals(); // Atualiza a lista na tela
            },
            (error) => {
                console.error('Erro ao salvar hospital:', error);
                alert('Falha ao salvar o hospital.');
            }
        );
    }
}

// Registra o controller no módulo AngularJS
angular.module('hospitalApp', []).controller('HospitalController', HospitalController);