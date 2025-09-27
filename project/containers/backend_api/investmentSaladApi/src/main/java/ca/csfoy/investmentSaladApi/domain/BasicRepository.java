package ca.csfoy.investmentSaladApi.domain;

/**
 * Dépôt de base pour l'application.
 * 
 * @author cboileau
 *
 * @param <I> Type de l'Identifiant de l'élément à stocker dans le dépôt.
 * @param <E> Type de l'Élément à stocker dans le dépôt
 */
public interface BasicRepository<I, E> {

	/**
	 * Obtient un élément de type E par son identifiant de type I.
	 * 
	 * @param id L'identifiant de l'élément à obtenir
	 * @return L'élément correspondant à l'identifiant fourni.
	 */
	E getBy(I id);

	/**
	 * Crée un élément de type E dans le dépôt. Le dépôt ne gère pas l'attribution
	 * d'identifiant automatiquement, l'identifiant doit donc être attribué par le
	 * domaine avant la création dans le dépôt.
	 * 
	 * @param element L'élément à créer dans le dépôt, incluant son identifiant.
	 */
	E create(E element);
}
