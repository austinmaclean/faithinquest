package com.faithinquest.web.controller;

import com.faithinquest.model.Slide;
import com.faithinquest.persistence.IPersistenceService;
import com.faithinquest.persistence.Paging;
import com.faithinquest.service.ISlideService;
import com.faithinquest.web.util.GridResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * User: gyazykov
 * Date: 5/16/14.
 * Time: 5:14 PM
 */
@Controller
@RequestMapping( Routes.CAROUSEL_SLIDE )
public class SlideController
{
	@Autowired
	private ISlideService slideService;

	public IPersistenceService<Slide, Long> persistentService()
	{
		return slideService;
	}

	@RequestMapping( value = { "/", "" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public GridResult<Slide> readAll( Paging paging )
	{
		return new GridResult<>( persistentService().readAll( paging ), paging.getTotal() );
	}
}
