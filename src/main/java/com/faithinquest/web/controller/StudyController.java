package com.faithinquest.web.controller;

import com.faithinquest.model.Study;
import com.faithinquest.model.dto.StudySearch;
import com.faithinquest.persistence.Paging;
import com.faithinquest.service.IStudyService;
import com.faithinquest.web.util.DefaultMessages;
import com.faithinquest.web.util.GridResult;
import com.faithinquest.web.util.OkResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * User: gleb
 * Date: 12/5/13
 * Time: 12:25 PM
 */
@Controller
public class StudyController
{
	@Autowired
	private IStudyService studyService;

	@RequestMapping( value = { Routes.ADMIN_STUDY + "/", Routes.ADMIN_STUDY + "" }, method = RequestMethod.POST,
		produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public Study create( @RequestBody Study study )
	{
		study.setId( null );
		studyService.saveOrUpdate( study );
		return study;
	}

	@RequestMapping( value = { Routes.ADMIN_STUDY + "/", Routes.ADMIN_STUDY + "" }, method = RequestMethod.PUT,
		produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public Study update( @RequestBody Study study )
	{
		studyService.saveOrUpdate( study );
		return study;
	}

	@RequestMapping( value = Routes.ADMIN_STUDY + "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public OkResponse delete( @PathVariable Long id )
	{
		studyService.delete( id );
		return DefaultMessages.OK_RESPONSE;
	}

	@RequestMapping( value = { Routes.STUDY + "/", Routes.STUDY + "" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public GridResult<Study> readAll( Paging paging )
	{
		if( paging == null )
		{
			paging = new Paging();
		}
		paging.setSortColumn( "created" );
		paging.setSortDesc( true );
		return new GridResult<>( studyService.readAll( paging ), paging.getTotal() );
	}

	@RequestMapping( value = { Routes.STUDY + "/find" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public GridResult<Study> findStudy( StudySearch search, Paging paging )
	{
		if( paging == null )
		{
			paging = new Paging();
		}
		paging.setSortColumn( "created" );
		paging.setSortDesc( true );
		return new GridResult<>( studyService.findStudy( search, paging ) );
	}
}
