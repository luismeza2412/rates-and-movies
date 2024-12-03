import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, AfterViewInit{
  @ViewChild('lineChart') lineChart!: ElementRef;
 public conversionForm: FormGroup;
 public exchangeRates: { [key: string]: number } = {};
 public convertedAmount: number | null = null;
 public errorMessage: string | null = null;
 public historicalData: { date: string; rate: number }[] = [];
 public chartInstance: Chart | null = null;

  constructor(
    private fb: FormBuilder,
    private exchangeRateService: ExchangeRateService
  ) {
    this.conversionForm = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });

  }

  ngOnInit(): void {
    this.loadExchangeRates();
    this.loadHistoricalData();
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  getObjectKeys(obj: { [key: string]: number }): string[] {
    return Object.keys(obj);
  }

  private loadExchangeRates(): void {
    this.exchangeRateService.getExchangeRates().subscribe((rates) => {
      this.exchangeRates = rates;
    });
  }

  private loadHistoricalData(): void {
    const storedData = localStorage.getItem('historicalData');
    if (storedData) {
      this.historicalData = JSON.parse(storedData);
      this.renderChart();
    }
  }

  convert(): void {
    if (this.conversionForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.convertedAmount = null;
      return;
    }

    this.errorMessage = null;
    const { fromCurrency, toCurrency, amount } = this.conversionForm.value;

    if (!this.exchangeRates[fromCurrency] || !this.exchangeRates[toCurrency]) {
      this.errorMessage = 'Las monedas seleccionadas no son válidas.';
      return;
    }

    const fromRate = this.exchangeRates[fromCurrency];
    const toRate = this.exchangeRates[toCurrency];
    const rate = toRate / fromRate;
    this.convertedAmount = (amount / fromRate) * toRate;
    
    
    const newEntry = { date: new Date().toISOString(), rate };
    this.historicalData.push(newEntry);
    localStorage.setItem('historicalData', JSON.stringify(this.historicalData));

    this.renderChart();

  }

  private renderChart(): void {
    const labels = this.historicalData.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    );
    const data = this.historicalData.map((entry) => entry.rate);

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Tasa de Cambio',
            data: data,
            borderColor: '#0077c8',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true }
        }
      }
    });
  }

 
}
