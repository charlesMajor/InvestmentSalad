package ca.csfoy.investmentSaladApi.domain;

/**
 * Dépôt de base avec une fonctionnalité ajoutée de modification.
 * 
 * @author cboileau
 *
 * @param <I>
 * @param <E>
 */
public interface DeleteRepository<I, E> extends BasicRepository<I, E> {

    void delete(I id);
}
