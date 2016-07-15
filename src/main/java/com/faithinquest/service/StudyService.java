package com.faithinquest.service;

import com.faithinquest.model.Study;
import com.faithinquest.model.dto.StudySearch;
import com.faithinquest.model.dto.StudySort;
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
			return findStudies( search, paging );
		}

		String[] words = pattern.split( "\\W|_" );
		if( words.length == 0 )
		{
			return findStudies( search, paging );
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
		StringBuilder queryString = new StringBuilder( query.getQueryString() );
		if( search.getSpeaker() != null )
		{
			queryString.append( "\n            AND speaker = :speaker" );
		}
		String sortMode = paging.getSortColumn();
		if( StudySort.MostRecent.name().equals( sortMode ) )
		{
			queryString.append( "\n            ORDER BY created DESC" );
		}
		else
		{
			queryString.append( "\n            ORDER BY ts_rank(p_search.document, to_tsquery(:searchPattern)) DESC" );
		}

		query = getSession().createSQLQuery( queryString.toString() );
		query.addEntity( Study.class );
		query.setParameter( "searchPattern", sb.toString() );
		if( search.getSpeaker() != null )
		{
			query.setParameter( "speaker", search.getSpeaker() );
		}
		if( paging.getOffset() != null )
		{
			query.setFirstResult( paging.getOffset() );
		}
		if( paging.getLimit() != null )
		{
			query.setMaxResults( paging.getLimit() );
		}
		List studies = query.list();
		if( studies.isEmpty() )
		{
			studies = findStudies( search, paging );
		}
		return studies;
	}

	private List<Study> findStudies( StudySearch search, Paging paging )
	{
		paging.setSortColumn( "created" );  //todo change this to sort by other options
		paging.setSortDesc( true );
		return findBy( search, paging );
	}
}
