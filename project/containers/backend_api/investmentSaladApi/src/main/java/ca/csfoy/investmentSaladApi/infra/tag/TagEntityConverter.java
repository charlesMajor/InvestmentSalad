package ca.csfoy.investmentSaladApi.infra.tag;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.domain.tag.Tag;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;

@Component
public class TagEntityConverter {

	public TagEntityConverter() {
	}

	public TagEntity fromTagToEntity(Tag tag, UserEntity user) {
		return new TagEntity(tag.getTagId(), user, tag.getName(), tag.getHexColor());

	}

	public List<Tag> fromEntityListToTagList(List<TagEntity> tagEntities) {
		return tagEntities.stream().map(this::fromEntityToTag).collect(Collectors.toList());
	}

	public Tag fromEntityToTag(TagEntity tag) {
		return new Tag(tag.getId(), tag.getName(), tag.getHexColor());
	}
}
