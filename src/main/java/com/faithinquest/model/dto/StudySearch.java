package com.faithinquest.model.dto;

import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

/**
 * User: gyazykov
 * Date: 6/4/16
 * Time: 11:36 AM
 */
public class StudySearch
{
	private String pattern;
	private String speaker;

	public void applyConditions( final Criteria criteria )
	{
		if( pattern != null )
		{
			criteria.add( Restrictions.or(
				Restrictions.ilike( "title", pattern, MatchMode.START ),
				Restrictions.ilike( "description", pattern, MatchMode.START ),
				Restrictions.ilike( "speaker", pattern, MatchMode.START ) ) );
		}
		if( speaker != null )
		{
			criteria.add( Restrictions.eq( "speaker", speaker ) );
		}
	}

	public void setPattern( String pattern )
	{
		this.pattern = pattern;
	}

	public void setSpeaker( String speaker )
	{
		this.speaker = speaker;
	}
}
