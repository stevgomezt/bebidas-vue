import { ref, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";

export const useFavoritosStore = defineStore("favoritos", () => {
    const bebidas = useBebidasStore();

    const favoritos = ref([]);

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    });

    watch(
        favoritos,
        () => {
            sincronizarLocalStorage();
        },
        {
            deep: true,
        }
    );

    const sincronizarLocalStorage = () => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
    };

    const existeFavorito = (id) => {
        const favoritosLocalStorage =
            JSON.parse(localStorage.getItem("favoritos")) ?? [];
        return favoritosLocalStorage.some(
            (favorito) => favorito.idDrink === id
        );
    };

    const handleClickFavorito = () => {
        // console.log(bebidas.receta);
        if (existeFavorito(bebidas.receta.idDrink)) {
            console.log("Ya existe...");
        } else {
            favoritos.value.push(bebidas.receta);
        }
    };

    return {
        favoritos,
        handleClickFavorito,
        existeFavorito,
    };
});
