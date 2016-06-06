package com.faithinquest.persistence;

import org.hibernate.Criteria;

/**
 * Date: 2/27/13
 * Time: 2:32 PM
 *
 * @author Reviakin Aleksey it.blackdog@gmail.com
 */
public interface ICriteriaModifier
{
	public void modify( Criteria criteria );
}
