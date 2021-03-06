package com.faithinquest.service.conversion.processors;

import com.faithinquest.persistence.BaseEntity;
import com.faithinquest.persistence.ICriteriaModifier;
import com.faithinquest.persistence.Paging;
import com.faithinquest.persistence.IPartialResultCallback;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * User: gyazykov
 * Date: 21/4/15
 * Time: 5:32 PM
 */
public interface IDataProcessor<T extends BaseEntity<I>, I extends Serializable>
{
	String[] getHeader( Set<String> exportCols );

	String[] itemToRow( Object[] dataItem, Set<String> exportCols );

	void findByConditions( ICriteriaModifier criteriaConditions, Paging paging, IPartialResultCallback<T, I> callback );

	Collection<Object[]> preparePartialResultData( List<T> items, ICriteriaModifier filter );

	void processImport( String[] row, Map<String, Integer> colNamesMap );
}

