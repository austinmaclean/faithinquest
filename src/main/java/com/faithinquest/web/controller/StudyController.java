package com.faithinquest.web.controller;

import com.faithinquest.model.Study;
import com.faithinquest.model.dto.StudySearch;
import com.faithinquest.persistence.Paging;
import com.faithinquest.service.IStudyService;
import com.faithinquest.service.conversion.FormatType;
import com.faithinquest.service.conversion.IConversionService;
import com.faithinquest.service.conversion.processors.IDataProcessor;
import com.faithinquest.web.util.DefaultMessages;
import com.faithinquest.web.util.DocumentDataView;
import com.faithinquest.web.util.GridResult;
import com.faithinquest.web.util.OkResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.View;

import java.io.IOException;
import java.util.Set;

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
	@Autowired
	private IConversionService conversionService;
	@Autowired
	private IDataProcessor studyDataProcessor;

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
		return new GridResult<>( studyService.findBy( search, paging ) );
	}

	@RequestMapping( value = Routes.ADMIN_STUDY + "/import", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public OkResponse importStudy( @RequestParam MultipartFile file ) throws IOException
	{
		FormatType type = FormatType.valueOf( file.getOriginalFilename().split( "\\." )[1].toUpperCase() );
		conversionService.importData( studyDataProcessor, file.getInputStream(), type );
		return DefaultMessages.OK_RESPONSE;
	}

	@RequestMapping( value = Routes.ADMIN_STUDY + "/export", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
	public View exportGroups( StudySearch search, @RequestParam( required = false ) Set<String> exportCols ) throws IOException
	{
		return new DocumentDataView( conversionService, studyDataProcessor, "study", FormatType.XLS, search, exportCols );
	}
}
