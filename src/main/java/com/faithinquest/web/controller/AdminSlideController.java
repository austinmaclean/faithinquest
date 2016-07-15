package com.faithinquest.web.controller;

import com.faithinquest.model.Slide;
import com.faithinquest.persistence.IPersistenceService;
import com.faithinquest.service.ISlideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.faithinquest.web.controller.Routes.ADMIN_CAROUSEL_SLIDE;

/**
 * User: gyazykov
 * Date: 5/16/14.
 * Time: 5:14 PM
 */
@Controller
@RequestMapping( ADMIN_CAROUSEL_SLIDE )
public class AdminSlideController extends AbstractRestFullController<Slide, Long>
{
	@Autowired
	private ISlideService slideService;

	public IPersistenceService<Slide, Long> persistentService()
	{
		return slideService;
	}

	@Override
	protected Slide store( Slide object )
	{
		return persistentService().merge( object );
	}
}
