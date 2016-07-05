package com.faithinquest.service;

import com.faithinquest.model.Study;
import com.faithinquest.model.dto.StudySearch;
import com.faithinquest.persistence.AbstractPersistenceService;
import com.faithinquest.persistence.Paging;
import org.hibernate.SQLQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * User: gleb
 * Date: 5/14/14
 * Time: 3:30 PM
 */
@Service
public class StudyService extends AbstractPersistenceService<Study, Long> implements IStudyService
{

	@Override
	@Transactional( readOnly = true )
	public List<Study> findByFullText( StudySearch search, Paging paging )
	{
		String pattern = search.getPattern();
		if( StringUtils.isEmpty( pattern ) )
		{
			return findBy( search, paging );
		}

		String[] words = pattern.split( "\\W|_" );
		if ( words.length == 0 )
		{
			return findBy( search, paging );
		}
		StringBuilder sb = new StringBuilder();
		for( String word : words )
		{
			if( word.length() == 0 )
			{
				continue;
			}
			if( sb.length() > 0 )
			{
				sb.append( " | " );
			}
			sb.append( word );
		}

		SQLQuery query = (SQLQuery) getSession().getNamedQuery( "Study.fullTextSearch" );
		String queryString = query.getQueryString();
		query.addEntity( Study.class );
		query.setParameter( "searchPattern",  sb.toString() );
		return query.list();
	}
}
