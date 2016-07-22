package com.faithinquest.service;

import com.faithinquest.model.SearchRequest;
import com.faithinquest.persistence.AbstractPersistenceService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * User: gleb
 * Date: 7/22/16
 * Time: 2:46 PM
 */
@Service
public class SearchRequestService extends AbstractPersistenceService<SearchRequest, String> implements ISearchRequestService
{
	@Async
	@Transactional
	public void increment( String search )
	{
		int i = getSession().getNamedQuery( "SearchRequest.increment" ).setParameter( "id", search ).executeUpdate();

		if( i == 0 )
		{
			SearchRequest searchRequest = new SearchRequest();
			searchRequest.setId( search );
			getSession().save( searchRequest );
		}
	}
}
