<?php

namespace App\Tests\Integration\Domain\Repositories;

use App\Application\Exceptions\CreateVaxxedPersonException;
use App\Domain\Entities\Models\VaxxedPerson;
use App\Domain\Repositories\VaxxedPersonRepository;
use App\Domain\Services\VaxxedPersonService;
use App\Tests\TestCase;
use Database\Factories\VaccineFactory;
use Database\Factories\VaxxedPersonFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VaxxedPersonRepositoryTest extends TestCase
{
    use RefreshDatabase;

    /**
     */
    public function testFirstOrCreateShouldCreate(): void
    {
        $data = [
            'cpf' => '460.793.440-25',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ];

        $vaxxedPersonRepository = new VaxxedPersonRepository();
        $vaxxedPerson = $vaxxedPersonRepository->firstOrCreate($data);

        $this->assertEquals('460.793.440-25', decrypt($vaxxedPerson->cpf));
        $this->assertEquals('John Doe', decrypt($vaxxedPerson->full_name));
        $this->assertEquals('1990-01-01', $vaxxedPerson->birthdate);
        $this->assertEquals('2022-01-15', $vaxxedPerson->first_dose);
        $this->assertEquals('2022-02-15', $vaxxedPerson->second_dose);
        $this->assertEquals('2022-09-15', $vaxxedPerson->third_dose);
        $this->assertEquals('CoronaVac', $vaxxedPerson->vaccine_applied);
        $this->assertEquals(0, $vaxxedPerson->has_comorbidity);
        $this->assertEquals(null, $vaxxedPerson->vaccine_id);
    }

    /**
     */
    public function testGetByCpf(): void
    {
        $data = [
            'cpf' => '460.793.440-25',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ];

        VaxxedPersonFactory::new()->create($data);

        $vaxxedPersonRepository = new VaxxedPersonRepository();
        $vaxxedPerson = $vaxxedPersonRepository->getByCpf('460.793.440-25');

        $this->assertEquals('460.793.440-25', $vaxxedPerson->cpf);
        $this->assertEquals('John Doe', $vaxxedPerson->full_name);
        $this->assertEquals('1990-01-01', $vaxxedPerson->birthdate);
        $this->assertEquals('2022-01-15', $vaxxedPerson->first_dose);
        $this->assertEquals('2022-02-15', $vaxxedPerson->second_dose);
        $this->assertEquals('2022-09-15', $vaxxedPerson->third_dose);
        $this->assertEquals('CoronaVac', $vaxxedPerson->vaccine_applied);
        $this->assertEquals(0, $vaxxedPerson->has_comorbidity);
        $this->assertEquals(null, $vaxxedPerson->vaccine_id);
    }

    public function testDeleteVaxxedPeopleById(): void
    {
        $dataToDelete = [1, 2];

        $vaxxedPersonFactory2 = VaxxedPersonFactory::new()->create([
            'id' => 2,
            'cpf' => '460.793.440-25',
            'full_name' => 'John Doe',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'AstraZeneca',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ]);

        $vaxxedPersonFactory1 = VaxxedPersonFactory::new()->create([
            'id' => 1,
            'cpf' => '123.456.789-00',
            'full_name' => 'Jane Smith',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ]);

        $vaxxedPersonFactory3 = VaxxedPersonFactory::new()->create([
            'id' => 3,
            'cpf' => '213.654.321-00',
            'full_name' => 'Hanna Smith',
            'birthdate' => '1990-01-01',
            'first_dose' => '2022-01-15',
            'second_dose' => '2022-02-15',
            'third_dose' => '2022-09-15',
            'vaccine_applied' => 'CoronaVac',
            'has_comorbidity' => 0,
            'vaccine_id' => null,
        ]);

        $vaxxedPersonRepository = new VaxxedPersonRepository();
        $vaxxedPersonRepository->deleteVaxxedPeopleById($dataToDelete);

        $vaxxedPersonOne = $vaxxedPersonRepository->getById($vaxxedPersonFactory1->id);
        $vaxxedPersonTwo = $vaxxedPersonRepository->getById($vaxxedPersonFactory2->id);
        $vaxxedPersonThree = $vaxxedPersonRepository->getById($vaxxedPersonFactory3->id);


        $this->assertNull($vaxxedPersonOne);
        $this->assertNull($vaxxedPersonTwo);
        $this->assertInstanceOf(VaxxedPerson::class, $vaxxedPersonThree);
    }
}