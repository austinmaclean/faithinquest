package com.faithinquest.service;

import com.faithinquest.model.Attachment;
import com.faithinquest.persistence.AbstractPersistenceService;
import org.springframework.stereotype.Service;

/**
 * User: gleb
 * Date: 5/28/14
 * Time: 6:03 PM
 */
@Service
public class AttachmentService extends AbstractPersistenceService<Attachment, Long> implements IAttachmentService
{
	@Override
	public void saveNewAttachment( Attachment attachment )
	{
		if( attachment != null && attachment.getId() == null )
		{
			getSession().save( attachment );
		}
	}
}
