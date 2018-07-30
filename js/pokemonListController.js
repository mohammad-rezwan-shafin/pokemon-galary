var pokemonGalaryApp = angular.module('pokemonGalaryApp', []);

pokemonListController = ($sce, $scope, $http) => {
    const MAX_POKEMON_SIZE=151;
    const MAX_PAGE_SIZE=20;
    // const POKEMON_GALARY_SRC_URL = "https://pokeapi.co/api/v2/pokemon";
    const POKEMON_GALARY_SRC_URL = "http://localhost:8010/proxy/api/v2/pokemon";

    const POKEMON_IMG_URL_PREFIX = "./images/";
    const POKEMON_IMG_URL_SUFFIX = ".png";

    const POKEMON_URL_PREFIX = "https://pokeapi.co/api/v2/pokemon/";
    const POKEMON_URL_SUFFIX = "\/";

    $scope.Math = window.Math;
    $scope.currentPage = 0;
    $scope.pageSize = MAX_PAGE_SIZE;
    $scope.pokemons = [];
    $scope.pokemonsSize = 0;    
    $scope.searchQuery = '';
    $scope.headingMessage = "";
    $scope.errorMessage = "";

    getPokemons = () => {
        let trustedUrl = $sce.trustAsResourceUrl(POKEMON_GALARY_SRC_URL);
        let params = {
            limit: MAX_POKEMON_SIZE
        };    
        headingMessage = "Loading...."; 
        $scope.currentPage = 0;
        // $http.jsonp(trustedUrl, { params: params })
        $http.get(trustedUrl, { params: params })
            .then(
                (data) => {
                    $scope.pokemons = (data.data.results);
                    initPokemonsExtraFields();
                }, error = (response, error, trace) => {
                    $scope.errorMessage = "Error Loading";
                }
            );
    }

    initPokemonsExtraFields = () => {
        $scope.headingMessage = "Pokemon Galary"
        $scope.pokemonsSize = $scope.pokemons.length; 
        for (let i=0; i<$scope.pokemonsSize; i++) {
            $scope.pokemons[i].idNumber = getPokemonId($scope.pokemons[i].url);
            $scope.pokemons[i].imgURL = getPokemonImgUrl($scope.pokemons[i].idNumber);
        }
    }

    getPokemonId = (url) => {
        let returnId = url.replace(POKEMON_URL_PREFIX, "");
        returnId = returnId.replace(POKEMON_URL_SUFFIX, "");
        return returnId;
    }

    getPokemonImgUrl = (idNumber) => {
        return POKEMON_IMG_URL_PREFIX + getPokemonId(idNumber) + POKEMON_IMG_URL_SUFFIX;
    }

    getPokemons();
} 

pokemonGalaryApp.controller('pokemonListController', pokemonListController);

