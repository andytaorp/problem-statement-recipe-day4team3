import React, { useState } from 'react';

const Ai = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert('Please select an image first.');

        const apiUserToken = '94f20ec2c4fa16e4ed3d4d27a18851d7ab09b019';
        const headers = { 'Authorization': `Bearer ${apiUserToken}` };
        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);
        try {
            
            const segmentationResponse = await fetch(
                'https://api.logmeal.com/v2/image/segmentation/complete',
                { method: 'POST', body: formData, headers }
            );
            const segmentationData = await segmentationResponse.json();
            console.log("Segmentation Response:", segmentationData);

            if (!segmentationData.imageId) throw new Error('Segmentation failed');

           
            const nutritionResponse = await fetch(
                'https://api.logmeal.com/v2/recipe/nutritionalInfo',
                {
                    method: 'POST',
                    headers: { ...headers, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageId: segmentationData.imageId }),
                }
            );
            const nutritionData = await nutritionResponse.json();
            console.log("Nutritional Response:", nutritionData);

            setResult(nutritionData);
        } catch (error) {
            console.error('Error:', error);
            setResult({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

   
    const keyNutrients = {
        ENERC_KCAL: { label: "Calories", unit: "kcal" },
        CHOCDF: { label: "Carbohydrates", unit: "g" },
        PROCNT: { label: "Protein", unit: "g" },
        FAT: { label: "Total Fat", unit: "g" },
        FASAT: { label: "Saturated Fat", unit: "g" },
        SUGAR: { label: "Sugar", unit: "g" },
        NA: { label: "Sodium", unit: "mg" }
    };

    return (
        <div className="pages">
            <form onSubmit={handleSubmit} className="signup">
                <h3>Upload a Photo</h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>

            {result && (
                <div className="workout-details">
                    <h4>Nutritional Information</h4>
                    {result.error ? (
                        <p className="error">{result.error}</p>
                    ) : (
                        <>
                            <p><strong>Total Calories:</strong> {result.nutritional_info?.calories.toFixed(2)} kcal</p>
                            <ul>
                                {Object.entries(keyNutrients).map(([key, { label, unit }]) => {
                                    const nutrient = result.nutritional_info?.totalNutrients?.[key];
                                    return nutrient ? (
                                        <li key={key}>
                                            <strong>{label}:</strong> {nutrient.value.toFixed(2)} {unit}
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Ai;

