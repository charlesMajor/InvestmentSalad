package ca.csfoy.investmentSaladApi.domain.widget;

import java.util.List;

import ca.csfoy.investmentSaladApi.domain.DeleteRepository;
import ca.csfoy.investmentSaladApi.domain.UpdateRepository;

public interface WidgetRepository extends UpdateRepository<String, Widget>, DeleteRepository<String, Widget> {

	public List<Widget> getAll();

	public Widget create(Widget widget);
}
