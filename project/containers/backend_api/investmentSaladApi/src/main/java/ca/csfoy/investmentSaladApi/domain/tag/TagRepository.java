package ca.csfoy.investmentSaladApi.domain.tag;

import java.util.List;

import ca.csfoy.investmentSaladApi.domain.BasicRepository;
import ca.csfoy.investmentSaladApi.domain.DeleteRepository;
import ca.csfoy.investmentSaladApi.domain.UpdateRepository;
import ca.csfoy.investmentSaladApi.infra.tag.TagId;

public interface TagRepository
		extends BasicRepository<TagId, Tag>, UpdateRepository<TagId, Tag>, DeleteRepository<TagId, Tag> {
	public List<Tag> getAllByUserId();

	public Tag getByTagId(String tagId);

	public void deleteByTagId(String tagId);

	public void saveByTagId(String tagId, Tag element);

	public List<String> getAllTagsByAssetId(String AssetId);

	public List<String> getAllAssetsByTagId(String tagId);
}
