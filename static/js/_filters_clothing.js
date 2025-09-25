// JS for _filters_clothing.html


        let activeFilters = {};

        function toggleDropdown(header) {
            const section = header.parentElement;
            section.classList.toggle('active');
        }

        function updateFilter(category, value, isChecked) {
            if (!activeFilters[category]) {
                activeFilters[category] = [];
            }
            
            if (isChecked) {
                if (!activeFilters[category].includes(value)) {
                    activeFilters[category].push(value);
                }
            } else {
                activeFilters[category] = activeFilters[category].filter(item => item !== value);
                if (activeFilters[category].length === 0) {
                    delete activeFilters[category];
                }
            }
            
            updateSelectedFilters();
        }

        function selectColor(swatch, colorName) {
            swatch.classList.toggle('selected');
            const isSelected = swatch.classList.contains('selected');
            updateFilter('color', colorName, isSelected);
        }

        function updateSelectedFilters() {
            const container = document.getElementById('selectedFilters');
            container.innerHTML = '';
            
            Object.keys(activeFilters).forEach(category => {
                activeFilters[category].forEach(value => {
                    const tag = document.createElement('div');
                    tag.className = 'filter-tag';
                    tag.innerHTML = `
                        ${value}
                        <span class="remove" onclick="removeFilter('${category}', '${value}')">&times;</span>
                    `;
                    container.appendChild(tag);
                });
            });
        }

        function removeFilter(category, value) {
            if (activeFilters[category]) {
                activeFilters[category] = activeFilters[category].filter(item => item !== value);
                if (activeFilters[category].length === 0) {
                    delete activeFilters[category];
                }
            }
            
            const checkbox = document.querySelector(`input[onchange*="${category}"][onchange*="${value}"]`);
            if (checkbox) {
                checkbox.checked = false;
            }
            
            if (category === 'color') {
                document.querySelectorAll('.color-swatch').forEach(swatch => {
                    if (swatch.onclick.toString().includes(value)) {
                        swatch.classList.remove('selected');
                    }
                });
            }
            
            updateSelectedFilters();
        }

        document.getElementById('minPrice').addEventListener('change', function() {
            const min = this.value;
            if (min) {
                updateFilter('price', `From $${min}`, true);
            }
        });

        document.getElementById('maxPrice').addEventListener('change', function() {
            const max = this.value;
            if (max) {
                updateFilter('price', `Up to $${max}`, true);
            }
        });

