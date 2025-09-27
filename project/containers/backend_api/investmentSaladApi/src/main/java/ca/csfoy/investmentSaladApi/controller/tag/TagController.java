package ca.csfoy.investmentSaladApi.controller.tag;

import org.springframework.web.bind.annotation.RestController;

import ca.csfoy.investmentSaladApi.api.tag.FullTagDto;
import ca.csfoy.investmentSaladApi.api.tag.LightTagDto;
import ca.csfoy.investmentSaladApi.api.tag.TagRessource;
import ca.csfoy.investmentSaladApi.controller.exception.ErrorMessageLabel;
import ca.csfoy.investmentSaladApi.controller.validations.CustomValidator;
import ca.csfoy.investmentSaladApi.controller.validations.ValidatorFactory;
import ca.csfoy.investmentSaladApi.domain.tag.TagRepository;

import java.util.List;

@RestController
public class TagController implements TagRessource {

	private final TagRepository repo;
	private final TagConverter converter;
	private final ValidatorFactory validatorFactory;

	public TagController(TagRepository repo, TagConverter converter, ValidatorFactory validatorFactory) {
		this.repo = repo;
		this.converter = converter;
		this.validatorFactory = validatorFactory;
	}

	//CREATE
	@Override
	public FullTagDto createTag(LightTagDto tagDto) {
		CustomValidator<LightTagDto, String> validator = validatorFactory.getLightTagDtoValidator();
		validator.validate(tagDto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return converter.fromTagToDto(repo.create(converter.fromLightDtoToTag(tagDto)));
	}
	
	//GET
	@Override
	public List<FullTagDto> getUserTags() {
		return converter.fromTagListToDtoList(repo.getAllByUserId());
	}

	@Override
	public List<String> getAllTagsIdByAssetId(String assetId) {
		CustomValidator<FullTagDto, String> validator = validatorFactory.getFullTagDtoValidator();
		validator.validateId(assetId);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return repo.getAllTagsByAssetId(assetId);
	}

	@Override
	public List<String> getAllAssetsByTagId(String tagId) {
		CustomValidator<FullTagDto, String> validator = validatorFactory.getFullTagDtoValidator();
		validator.validateId(tagId);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return repo.getAllAssetsByTagId(tagId);
	}
	
	@Override
	public FullTagDto getTagById(String tagId) {
		CustomValidator<FullTagDto, String> validator = validatorFactory.getFullTagDtoValidator();
		validator.validateId(tagId);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		return converter.fromTagToDto(repo.getByTagId(tagId));
	}

	//UPDATE
	@Override
	public void updateTag(String tagId, FullTagDto tagDto) {
		CustomValidator<FullTagDto, String> validator = validatorFactory.getFullTagDtoValidator();
		validator.validate(tagId, tagDto);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		repo.saveByTagId(tagId, converter.fromFullDtoToTag(tagDto));
	}

	//DELETE
	@Override
	public void deleteTag(String id) {
		CustomValidator<FullTagDto, String> validator = validatorFactory.getFullTagDtoValidator();
		validator.validateId(id);
		validator.verify(ErrorMessageLabel.MSG_VAL_GENERIC);
		repo.deleteByTagId(id);
	}


}
