package com.faithinquest.service;

import com.faithinquest.model.Attachment;
import com.faithinquest.persistence.IPersistenceService;

/**
 * User: gleb
 * Date: 6/9/14
 * Time: 4:38 PM
 */
public interface IAttachmentService extends IPersistenceService<Attachment, Long>
{
	void saveNewAttachment( Attachment attachment );
}
