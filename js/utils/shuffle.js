/**
 * Mélange un tableau de manière aléatoire (algorithme de Fisher-Yates).
 * @param {Array} array Le tableau à mélanger.
 * @returns {Array} Le tableau mélangé.
 */
export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // Tant qu'il reste des éléments à mélanger.
  while (currentIndex !== 0) {
    // Sélectionne un élément restant.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Et l'échange avec l'élément actuel.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
