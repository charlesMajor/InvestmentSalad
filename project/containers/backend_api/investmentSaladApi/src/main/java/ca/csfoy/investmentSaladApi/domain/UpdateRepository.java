package ca.csfoy.investmentSaladApi.domain;

/**
 * Dépôt de base avec une fonctionnalité ajoutée de modification.
 * 
 * @author cboileau
 *
 * @param <I>
 * @param <E>
 */
public interface UpdateRepository<I, E> extends BasicRepository<I, E> {

    void save(I id, E element);
}
