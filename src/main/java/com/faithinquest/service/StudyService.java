package com.faithinquest.service;

import com.faithinquest.model.Study;
import com.faithinquest.persistence.AbstractPersistenceService;
import org.springframework.stereotype.Service;

/**
 * User: gleb
 * Date: 5/14/14
 * Time: 3:30 PM
 */
@Service
public class StudyService extends AbstractPersistenceService<Study, Long> implements IStudyService
{

}
