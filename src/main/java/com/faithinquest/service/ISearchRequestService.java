package com.faithinquest.service;

import com.faithinquest.model.SearchRequest;
import com.faithinquest.persistence.IPersistenceService;

/**
 * User: gleb
 * Date: 5/23/14
 * Time: 4:36 PM
 */
public interface ISearchRequestService extends IPersistenceService<SearchRequest, String>
{
	void increment( String search );
}
