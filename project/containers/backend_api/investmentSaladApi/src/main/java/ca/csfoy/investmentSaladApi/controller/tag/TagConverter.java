package ca.csfoy.investmentSaladApi.controller.tag;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ca.csfoy.investmentSaladApi.api.tag.FullTagDto;
import ca.csfoy.investmentSaladApi.api.tag.LightTagDto;
import ca.csfoy.investmentSaladApi.domain.tag.Tag;

@Component
public class TagConverter {

	public TagConverter() {
	}

	public FullTagDto fromTagToDto(Tag tag) {
		return new FullTagDto(tag.getTagId(), tag.getName(), hexIntToString(tag.getHexColor()));
	}

	public Tag fromLightDtoToTag(LightTagDto dto) {
		return new Tag(UUID.randomUUID().toString(), dto.getName(), hexStringToInt(dto.getHexColor()));
	}

	public Tag fromFullDtoToTag(FullTagDto dto) {
		return new Tag(dto.getTagId(), dto.getName(), hexStringToInt(dto.getHexColor()));
	}

	public List<FullTagDto> fromTagListToDtoList(List<Tag> tags) {
		return tags.stream().map(this::fromTagToDto).collect(Collectors.toList());
	}

	private int hexStringToInt(String hexString) {
		return Integer.parseInt(hexString, 16);
	}

	private String hexIntToString(int hexInt) {
		return Integer.toHexString(hexInt);
	}

}