package ca.csfoy.investmentSaladApi.infra.tag;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import ca.csfoy.investmentSaladApi.infra.tag.crypto_asset_tag.CryptoAssetTagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.fixed_revenue_asset_tag.FixedRevenueAssetTagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.ressource_asset_tag.RessourceAssetTagEntity;
import ca.csfoy.investmentSaladApi.infra.tag.stock_asset_tag.StockAssetTagEntity;
import ca.csfoy.investmentSaladApi.infra.user.UserEntity;
import ca.csfoy.investmentSaladApi.infra.widget.WidgetEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@IdClass(TagId.class)
public class TagEntity {

	@Id
	private String id;

	@Id
	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private UserEntity userEntity;

	@Column(length = 20, nullable = false)
	private String name;
	@Column(nullable = false)
	private int hexColor;

	@OneToMany(mappedBy = "id.tag", cascade = CascadeType.ALL)
	private Set<CryptoAssetTagEntity> cryptoAssetTags = new HashSet<>();
	@OneToMany(mappedBy = "id.tag", cascade = CascadeType.ALL)
	private Set<StockAssetTagEntity> stockAssetTags = new HashSet<>();
	@OneToMany(mappedBy = "id.tag", cascade = CascadeType.ALL)
	private Set<RessourceAssetTagEntity> ressourceAssetTags = new HashSet<>();
	@OneToMany(mappedBy = "id.tag", cascade = CascadeType.ALL)
	private Set<FixedRevenueAssetTagEntity> fixedRevenueAssetTags = new HashSet<>();

	@ManyToMany
	public Set<WidgetEntity> widgets = new HashSet<>();

	public TagEntity() {

	}

	public TagEntity(String id, UserEntity userEntity, String name, int hexColor) {
		super();
		this.id = id;
		this.userEntity = userEntity;
		this.name = name;
		this.hexColor = hexColor;
	}

	public UserEntity getUserEntity() {
		return userEntity;
	}

	public String getName() {
		return name;
	}

	public int getHexColor() {
		return hexColor;
	}

	public Set<CryptoAssetTagEntity> getCryptoAssetTags() {
		return cryptoAssetTags;
	}

	public Set<StockAssetTagEntity> getStockAssetTags() {
		return stockAssetTags;
	}

	public Set<RessourceAssetTagEntity> getRessourceAssetTags() {
		return ressourceAssetTags;
	}

	public Set<FixedRevenueAssetTagEntity> getFixedRevenueAssetTags() {
		return fixedRevenueAssetTags;
	}

	public Set<WidgetEntity> getWidgets() {
		return widgets;
	}

	public String getId() {
		return id;
	}

	public void addWidget(WidgetEntity widget) {
		if (!this.widgets.stream().map(WidgetEntity::getId).collect(Collectors.toList()).contains(widget.getId())) {
			widgets.add(widget);
		}
	}

	public void removeWidget(String id) {
		for (WidgetEntity widget : this.widgets) {
			if (widget.getId().equals(id)) {
				this.widgets.remove(widget);
				break;
			}
		}
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		TagEntity incomingEntity = (TagEntity) o;
		return id.equals(incomingEntity.id) && name.equals(incomingEntity.name)
				&& this.hexColor == incomingEntity.hexColor;
	}

}