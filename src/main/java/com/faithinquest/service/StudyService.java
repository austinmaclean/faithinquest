package com.faithinquest.service;

import com.faithinquest.model.Study;
import com.faithinquest.model.dto.StudySearch;
import com.faithinquest.persistence.AbstractPersistenceService;
import com.faithinquest.persistence.Paging;
import org.hibernate.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	@SuppressWarnings( "unchecked" )
	public List<Study> findStudy( final StudySearch search, final Paging paging )
	{
		Criteria criteria = createCriteria();
		search.applyConditions( criteria );
		applyFetching( criteria );
		applyPaging( criteria, paging );
		criteria.setResultTransformer( Criteria.DISTINCT_ROOT_ENTITY );
		return (List<Study>) criteria.list();
	}
}
