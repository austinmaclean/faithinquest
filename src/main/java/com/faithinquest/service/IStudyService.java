package com.faithinquest.service;

import com.faithinquest.model.Study;
import com.faithinquest.model.dto.StudySearch;
import com.faithinquest.persistence.IPersistenceService;
import com.faithinquest.persistence.Paging;

import java.util.List;

/**
 * User: gleb
 * Date: 5/14/14
 * Time: 3:29 PM
 */
public interface IStudyService extends IPersistenceService<Study, Long>
{
	List<Study> findByFullText( StudySearch search, Paging paging );

	List<Study> findByPattern( StudySearch search, Paging paging );

	void incrementViewsCount( Long studyId );
}

