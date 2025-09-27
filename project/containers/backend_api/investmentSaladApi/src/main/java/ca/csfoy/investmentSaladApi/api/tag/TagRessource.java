package ca.csfoy.investmentSaladApi.api.tag;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RequestMapping(value = TagRessource.RESOURCE_PATH, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public interface TagRessource {
	String RESOURCE_PATH = "/tags";
	String PATH_PARAM_ID = "id";
	String PATH_WITH_ID = "/{" + PATH_PARAM_ID + "}";

	String PATH_PARAM_ASSET_ID = "assetId";
	String PATH_WITH_ASSET_ID = "/assets/{" + PATH_PARAM_ASSET_ID + "}";

	String PATH_WITH_ASSETS = PATH_WITH_ID + "/assets";

	// POST
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	FullTagDto createTag(@RequestBody LightTagDto tagDto);

	// GET
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	List<FullTagDto> getUserTags();

	@GetMapping(PATH_WITH_ASSETS)
	@ResponseStatus(HttpStatus.OK)
	List<String> getAllAssetsByTagId(@PathVariable(PATH_PARAM_ID) String tagId);

	@GetMapping(PATH_WITH_ASSET_ID)
	@ResponseStatus(HttpStatus.OK)
	List<String> getAllTagsIdByAssetId(@PathVariable(PATH_PARAM_ASSET_ID) String assetId);

	@GetMapping(PATH_WITH_ID)
	@ResponseStatus(HttpStatus.OK)
	FullTagDto getTagById(@PathVariable(PATH_PARAM_ID) String tagId);

	// PUT
	@PutMapping(PATH_WITH_ID)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void updateTag(@PathVariable(PATH_PARAM_ID) String tagId, @RequestBody FullTagDto tagDto);

	// DELETE
	@DeleteMapping(PATH_WITH_ID)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void deleteTag(@PathVariable(PATH_PARAM_ID) String id);

}